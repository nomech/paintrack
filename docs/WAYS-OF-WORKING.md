# Ways of Working

## Pull request template

Every PR should include:

- Linked issue
- Clear summary of the change
- Test evidence
- Completion of the checklist below

### Checklist

- [ ] I linked the issue this PR addresses
- [ ] I described what changed and why
- [ ] I added or updated tests (or explained why not needed)
- [ ] I verified the change locally

## Project board

The repository expects a GitHub Project (v2) with:

- Status options: **Backlog**, **Ready**, **In Progress**, **In Review**, **Done**
- Custom fields: **Epic** (text), **Estimate** (number), **Sprint** (iteration), **Priority** (single select)

Automation in `.github/workflows/project-board-automation.yml` relies on:

- Repository variable `PROJECT_V2_NUMBER` set to the project number.
- Optional secret `PROJECT_AUTOMATION_TOKEN` with project write permissions (defaults to `GITHUB_TOKEN` when not provided).

When configured:

- New issues are added to the project and moved to **Backlog**.
- Merged pull requests are added to the project (if missing) and moved to **Done**.
