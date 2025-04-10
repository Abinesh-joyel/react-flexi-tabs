import { execSync } from 'child_process';
import prompts from 'prompts';
import simpleGit from 'simple-git';
import chalk from 'chalk';

const git = simpleGit();

const run = cmd => {
  console.log(chalk.blue(`\n$ ${cmd}`));
  execSync(cmd, { stdio: 'inherit' });
};

const getCurrentBranch = async () => {
  const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
  return branch.trim();
};

async function main() {
  const branch = await getCurrentBranch();
  const isMainBranch = branch === 'master';

  console.log(chalk.cyan(`🔍 Current branch: ${branch}`));

  const { releaseType } = await prompts({
    type: 'select',
    name: 'releaseType',
    message: 'Select release type',
    choices: [
      { title: 'Patch', value: 'patch' },
      { title: 'Minor', value: 'minor' },
      { title: 'Major', value: 'major' },
      { title: 'Custom (hotfix or prerelease)', value: 'custom' },
      { title: 'Cancel', value: 'cancel' },
    ],
  });

  if (releaseType === 'cancel') {
    console.log(chalk.yellow('🛑 Release cancelled.'));
    return;
  }

  if (!isMainBranch && releaseType !== 'custom') {
    console.error(
      chalk.red(
        `🚫 Only 'custom' releases are allowed on non-master branches. Please switch to 'master' or use 'custom' release.`
      )
    );
    process.exit(1);
  }

  // Step 1: Create a changeset
  if (releaseType !== 'custom') {
    run(`pnpm changeset --${releaseType}`);
  } else {
    run(`pnpm changeset`);
  }

  // Step 2: Commit the version bump and changelog
  run('git add .');
  run('git commit -m "chore(release): version bump and changelog"');
  run('git push');

  // Step 3: Apply version bump
  run('pnpm changeset version');

  // Step 4: Sync lockfile
  run('pnpm install');

  // ✅ Step 5: Build packages
  run('pnpm build');

  // Step 6: Publish changed packages
  run('pnpm changeset publish');

  // Step 7: Push the published tags
  run('git push --follow-tags');

  console.log(chalk.green('\n✅ Release complete!'));
}

main().catch(err => {
  console.error(chalk.red('❌ Release script failed:'), err);
  process.exit(1);
});
