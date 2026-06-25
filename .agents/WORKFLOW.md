# WORKFLOW.md — Git, CI/CD, Release

## Branching

- `main` — default branch, always releasable
- Feature branches: `feat/<name>`, fix branches: `fix/<name>`
- Direct pushes to `main` allowed (single-developer project)

## Commit conventions

```
<type>: <short description>

<body> (optional — explain what and why, not how)
```

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`

## CI pipeline (`.github/workflows/ci.yml`)

Triggered on push/PR to `main`:

| Job | What it does |
|-----|-------------|
| Test (Node 18, 20, 22) | `npm ci` → `npm test` (807 tests) |
| TypeScript check | `npx tsc --noEmit` |
| Build | `npm run build` → verify 231 exports → check bundle < 50 KB |

## Release pipeline (`.github/workflows/release.yml`)

Triggered by `git push origin v*.*.*` or manual dispatch:

| Step | What happens |
|------|-------------|
| Prepare | Extract version, detect pre-release |
| Test & build | Run tests, build, verify bundle |
| Milestone | Create vX.Y.Z milestone (stable only) |
| Release | Generate release notes, create GitHub Release |
| Publish | Publish `@apithy-edson-gomez/helios` to GitHub Packages |

### How to release

```bash
git tag v1.2.3
git push origin v1.2.3
```

The workflow handles everything: testing, building, changelog generation, milestone, and npm publish.

### Pre-releases

Tags with a suffix (`v1.2.3-rc1`, `v2.0.0-beta`) are treated as pre-releases:
- No milestone created
- Release marked as pre-release
- Not published as latest
