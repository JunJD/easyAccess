```markdown
# EasyAccess

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ 您的新鲜、闪亮的 [Nx 工作区](https://nx.dev) 几乎准备好了 ✨。

[了解更多关于此工作区设置及其功能的信息](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) 或运行 `npx nx graph` 以可视化地探索所创建的内容。现在，让我们开始吧！

## 完成您的 CI 设置

[点击此处完成工作区设置！](https://cloud.nx.app/connect/UYvR07Wgz5)


## 运行任务

要为您的应用运行开发服务器，请使用：

```sh
npx nx dev easyAccess
```

要创建生产包：

```sh
npx nx build easyAccess
```

要查看为项目可运行的所有目标，请运行：

```sh
npx nx show project easyAccess
```
        
这些目标要么是[自动推断](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)的，要么在 `project.json` 或 `package.json` 文件中定义。

[更多关于运行任务的文档 &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 添加新项目

虽然您可以手动向工作区添加新项目，但您可能希望利用 [Nx 插件](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)及其[代码生成](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)功能。

使用插件的生成器来创建新项目。

要生成新应用，请使用：

```sh
npx nx g @nx/next:app demo
```

要生成新库，请使用：

```sh
npx nx g @nx/react:lib mylib
```

您可以使用 `npx nx list` 获取已安装插件的列表。然后，运行 `npx nx list <plugin-name>` 来了解特定插件的更多功能。或者，[安装 Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) 以在 IDE 中浏览插件和生成器。

[了解更多关于 Nx 插件 &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [浏览插件注册表 &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[了解更多关于 CI 上的 Nx](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 安装 Nx Console

Nx Console 是一个编辑器扩展，它丰富您的开发体验。它让您可以运行任务、生成代码，并在 IDE 中改进代码自动完成。它适用于 VSCode 和 IntelliJ。

[安装 Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 有用的链接

了解更多：

- [了解更多关于此工作区设置](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [了解 CI 上的 Nx](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [使用 Nx release 发布包](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [什么是 Nx 插件？](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

并加入 Nx 社区：
- [Discord](https://go.nx.dev/community)
- [在 X 上关注我们](https://twitter.com/nxdevtools) 或 [LinkedIn](https://www.linkedin.com/company/nrwl)
- [我们的 Youtube 频道](https://www.youtube.com/@nxdevtools)
- [我们的博客](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

```