# Issue documentation

Every implementation issue must include a dated documentation bundle:

```text
docs/
  YYYY/
    MM/
      DD/
        issue-name/
          human.md
          ai.md
```

Use the date work began and a short kebab-case issue name. Keep one bundle per
issue, even when several issues are completed on the same day.

## `human.md`

Write for reviewers who need to understand and validate the change without
reading every implementation detail:

- State the outcome and user-visible behavior.
- Explain the problem in plain language.
- Walk through the important changes.
- Provide focused review and test steps.
- Call out risks, migration needs, or operational follow-up.

## `ai.md`

Write durable technical context for future agents and maintainers:

- Record the root cause, constraints, and chosen architecture.
- List changed files and the responsibility of each.
- Document data flow, invariants, failure handling, and external dependencies.
- Include exact verification commands and their expected outcomes.
- Note deferred work and assumptions without copying secrets or transient logs.

Create both files before an issue is considered complete and update them when
the implementation changes. Prefer relative repository links so the documents
remain useful across branches and clones.
