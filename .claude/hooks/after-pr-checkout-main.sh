#!/bin/sh
# Return the working tree to main once a pull request has actually been created.
#
# Why a Claude Code hook and not a git hook: opening a PR is a `gh` call, not a git
# operation, so no git hook is ever handed the event. This one reads the PostToolUse
# payload on stdin, matches the command, and confirms a PR URL came back before it
# moves — `gh pr create` can fail while the Bash tool call around it still succeeds,
# and switching branches off the back of a failed PR would strand the work.
#
# It never forces the move. If `git checkout main` refuses — uncommitted work that
# would collide with main — the branch is left exactly where it is and the failure is
# reported. Every message goes back to the model as well as the user, because a branch
# that changed underneath it is otherwise invisible.

payload=$(cat)

command=$(printf '%s' "$payload" | jq -r '.tool_input.command // ""')
case "$command" in
  *'gh pr create'*) ;;
  *) exit 0 ;;
esac

# Every string in the response, so this does not depend on which field carries stdout.
response=$(printf '%s' "$payload" | jq -r '[.tool_response | .. | strings] | join("\n")' 2>/dev/null)
case "$response" in
  *'/pull/'*) ;;
  *) exit 0 ;;
esac

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null) || exit 0
if [ "$branch" = "main" ]; then
  exit 0
fi

# A PR opened with an explicit --head for a branch that is not the one checked out here came from
# another worktree. This hook runs in the project directory, not where the command ran, so moving
# this checkout would yank a branch out from under whatever is working in it.
head=$(printf '%s' "$command" | sed -n 's/.*--head[= ]\([^ ]*\).*/\1/p')
if [ -n "$head" ] && [ "$head" != "$branch" ]; then exit 0; fi

if out=$(git checkout main 2>&1); then
  message="PR created — switched from $branch back to main. The feature branch still holds the commits."
else
  message="PR created, but still on $branch: git checkout main failed. $out"
fi

jq -n --arg m "$message" '{
  systemMessage: $m,
  hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext: $m }
}'
