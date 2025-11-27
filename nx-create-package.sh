npx nx g @nx/js:lib \
    --name temp \
    --directory packages/temp \
    --useProjectJson false \
    --bundler tsc \
    --compiler tsc \
    --linter eslint \
    --unitTestRunner jest \
    --minimal \
    --strict
