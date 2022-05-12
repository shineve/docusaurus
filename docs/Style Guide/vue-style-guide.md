---
title: 前端 Vue 規範
keywords: [vue, javascript, front-end, coding, conventions]
date: 2022-05-02
authors: shineve
categories:
  - Vue
  - Front-End
  - Coding Conventions
tags:
  - Vue
  - JavaScript
  - Coding Conventions
---

# AI 前端 Vue 規範

### 文件命名 (kebab-case)

統一小寫，多個單詞作爲文件名使用分隔符`-`

```js
// bad
StudentList.vue;
studentList.vue;

// good
student-list.vue;
```

### 緊密耦合的組件命名

和父組件緊密耦合的子組件應該以父組件名作爲前綴命名

```js
// bad
components/
|- todo-list.vue
|- todo-item.vue
└─ todo-button.vue

// good
components/
|- todo-list.vue
|- todo-list-item.vue
└─ todo-list-item-button.vue
```

### 自閉合組件

在單文件組件中沒有內容的組件應該是自閉合的

```html
<!-- bad -->
<MyInput></MyInput>

<!-- good -->
<MyInput />
```

### 指令縮寫

用`:` 表示 `v-bind`: ，用`@`表示`v-on`

```html
<!-- bad -->
<input v-bind:value="value" v-on:change="onChange" />

<!-- good -->
<input :value="value" @change="onChange" />
```

### 組件數據

組件的 data 必須是一個函數,並且建議在此不使用Arrow Function

```js
// bad
export default {
  data: () => ({
    foo: 'bar'
  })
}

// good
export default {
  data () {
    return {
      foo: 'bar'
    }
  }
}
```

### props 命名

Camel Case 命名。內容儘量詳細，至少有默認值、是否為必須值

```js
// bad
greeting-text: String

// good
greetingText: { type: String, default: '', required: true }
```

### 組件屬性順序和分行規則

順序原則：重要屬性放前面

順序依據：依次`指令`->`props屬性`-> `事件`->`dom屬性(class有標記作用，除外)`

分行規則：放在一行，重要內容較多時，可放置 2 ～ 3 行

```html
<!-- bad -->
<MySelect
  class="select"
  size="s"
  @select="searchStudent($event, row)"
  @blur="searchStudent($event, row)"
  v-model="row.studentId"
  :list="studentList"
/>

<!-- good -->
<MySelect
  v-model="row.studentId"
  :list="studentList"
  size="s"
  @select="searchStudent($event, row)"
  @blur="searchStudent($event, row)"
  class="select"
/>
```

### Vue API 順序

```js
export default {
  name: '',
  /*1. Vue擴展 */
  extends: '', // extends和mixins都擴展邏輯，需要重點放前面
  mixins: [],
  components: {},
  /* 2. Vue數據 */
  props: {},
  model: { prop: '', event: '' }, // model 會使用到 props
  data() {
    return {};
  },
  computed: {},
  watch: {}, // watch 監控的是 props 和 data，有必要時監控computed
  /* 3. Vue資源 */
  filters: {},
  directives: {},
  /* 4. Vue生命週期 */
  created() {},
  mounted() {},
  destroy() {},
  /* 5. Vue方法 */
  methods: {}, // all the methods should be put here in the last
};
```

### Vue 組件頂級標籤順序

順序保持一致，且標籤之間留有空行。

```html
<template>
  <div></div>
</template>

<script>
export default {};
</script>

<style>
.app {
}
</style>
```

### import 引入順序

原則：同等類型的放一起，優先放 mixins 和 components 等本地資源，再到第三方資源。忌隨意放置

```js
// bad
import _ from 'lodash';
import { getAllEntityList, getVariableGroup } from '@/server/api';
import { helpers } from 'vuelidate/lib/validators';
import { getRepeatLine } from '@/utils/common';
import { CloseModalMixin, InvalidCheckMixin } from '@/components/common/mixins';
import dayjs from 'dayjs';
import VSearchSelect from '@/components/variable/v-search-select';
import EModifyModal from '@/components/entity/e-modify-modal';
import { MODIFY_MODAL_TYPE } from '@/utils/config';
import { botIdLoc, custIdLoc } from '@/utils/locs';

// good
import { CloseModalMixin, InvalidCheckMixin } from '@/components/common/mixins';
import VSearchSelect from '@/components/variable/v-search-select';
import EModifyModal from '@/components/entity/e-modify-modal';
import { getAllEntityList, getVariableGroup } from '@/server/api';
import { helpers } from 'vuelidate/lib/validators';
import { MODIFY_MODAL_TYPE } from '@/utils/config';
import { getRepeatLine } from '@/utils/common';
import { botIdLoc, custIdLoc } from '@/utils/locs';

import _ from 'lodash';
import dayjs from 'dayjs';
```

### Vue 複雜 data 加註釋/分組

data 數據是連接 View 和 Modal 的基礎，當 ViewModal 複雜時，建議進行註釋並分組。另外，當 data 過於複雜時應考慮優化重構。

```js
// bad
data() {
    return {
        isOpenModal: false,
        list: [],
        groupList: [],
        searchParams: { groupId: '', searchParam: '', searchType: '' },
        pageParam: { currentPage: 1, pageSize: 50 },
        totalCount: 0,
        groupId: '',
        typeList: [],
        defaultType: 'paramName'
    }
}

// good
data() {
    return {
        variableList: [],
        groupList: [],
        typeList: [],

        /*
        * 查詢參數
        * 組與組之間通過空行區分
        */
        searchParams: { groupId: '', searchParam: '', searchType: '', currentPage: 1, pageSize: 50 },
        totalCount: 0,
        defaultType: '',

        isOpenModal: false
    }
}
```

### 參考鏈接

[Vue 官方風格指南](https://cn.vuejs.org/v2/style-guide/index.html)

[有贊風格指南](https://youzan.github.io/vant/#/zh-CN/style-guide)
