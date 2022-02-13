<template>
  <div>Hello {{ $t.foo }} !</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Store } from '@/store';
import { sleep } from "@/plugins/helpers/"

export default defineComponent({
  props: {
    store: {
      type: Object as PropType<Store>,
      required: true
    },
  },
  async setup(props) {
    if (props.store.isServer) {
      // no sleep for server
    }
    else {
      await sleep(100);
    }
  },
})
</script>


<i18n>
{
  "test": "World",
  "foo": {
    "bar": "Мир"
  }
}
</i18n>