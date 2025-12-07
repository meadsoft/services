# Package Bundling Guide

## Overview

All packages in `packages/*` use a two-step build process:

1. **TypeScript Compilation (`tsc`)**: Generates type definitions (`.d.ts`) and individual JavaScript files
2. **Bundling (`tsup`)**: Creates bundled ESM (`index.js`) and CommonJS (`index.cjs`) outputs

## Why This Setup?

- **TypeScript** handles type definitions and references between packages
- **tsup** creates optimized bundles for both module formats (ESM and CJS)
- This ensures all exports are properly bundled into `index.cjs` and `index.js`

## Build Commands

### Build a single package

```bash
pnpm nx run <package-name>:build    # Runs tsc only
pnpm nx run <package-name>:bundle   # Runs tsc + tsup
```

### Build all packages

```bash
pnpm nx run-many --target=bundle --all
```

### Build specific packages

```bash
pnpm nx run-many --target=bundle --projects=common,auth,cms
```

## How It Works

1. **tsc** compiles TypeScript files:
    - Generates `.d.ts` type definition files
    - Transpiles individual `.ts` files to `.js`
    - Maintains project references for dependency tracking

2. **tsup** bundles the compiled code:
    - Reads from `src/index.ts`
    - Bundles all exports into single files
    - Generates `dist/index.js` (ESM) and `dist/index.cjs` (CommonJS)
    - Tree-shakes unused code

## Configuration Files

### `tsup.config.ts` (per package)

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: false, // TypeScript handles this
    outDir: "dist",
    // ... other options
});
```

### `package.json` exports

```json
{
    "exports": {
        ".": {
            "types": "./dist/index.d.ts",
            "import": "./dist/index.js",
            "require": "./dist/index.cjs"
        }
    }
}
```

## Troubleshooting

### Constants/exports not appearing in `index.cjs`

**Solution**: Run the bundle command

```bash
pnpm nx run <package-name>:bundle
```

The TypeScript compiler alone doesn't create bundled files - you need tsup for that.

### After adding new exports

Always run the bundle command to regenerate the bundled outputs:

```bash
pnpm nx run-many --target=bundle --all
```

## Development Workflow

When developing packages locally:

1. Make changes to source files
2. Run `pnpm nx run <package>:bundle` to rebuild
3. Or use watch mode (if configured): `pnpm nx run <package>:watch`

## CI/CD Integration

Ensure your CI pipeline runs:

```bash
pnpm nx run-many --target=bundle --all
```

This generates all necessary build artifacts for both ESM and CJS consumers.
