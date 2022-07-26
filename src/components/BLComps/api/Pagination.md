---
category: Components
subtitle: 分页
type: 导航
title: Pagination
cols: 1
---

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

## API

```html
<Pagination onChange="{onChange}" total="{50}" />
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| current | 当前页数 | number | - |  |
| defaultCurrent | 默认的当前页数 | number | 1 |  |
| defaultPageSize | 默认的每页条数 | number | 10 |  |
| disabled | 禁用分页 | boolean | - | 3.10.0 | 3.18.0 |
| hideOnSinglePage | 只有一页时是否隐藏分页器 | boolean | false | 3.1.0 |
| itemRender | 用于自定义页码的结构，可用于优化 SEO | (page, type: 'page' \| 'prev' \| 'next', originalElement) => React.ReactNode | - |  |
| pageSize | 每页条数 | number | - |  |
| pageSizeOptions | 指定每页可以显示多少条 | string\[] | \['10', '20', '30', '40'] |  |
| showLessItems | show less page items | boolean | false | 3.16.3 |
| showQuickJumper | 是否可以快速跳转至某页 | boolean \| `{ goButton: ReactNode }` | false |  |
| showSizeChanger | 是否可以改变 pageSize | boolean | false |  |
| showTotal | 用于显示数据总量和当前数据顺序 | Function(total, range) | - |  |
| simple | 当添加该属性时，显示为简单分页 | boolean | - |  |
| size | 当为「small」时，是小尺寸分页，基于实现最新博拉UI，size统一选用small，可不传 | string | "small" |  |
| total | 数据总数 | number | 0 |  |
| onChange | 页码改变的回调，参数是改变后的页码及每页条数 | Function(page, pageSize) | noop |  |
| onShowSizeChange | pageSize 变化的回调 | Function(current, size) | noop |  |
