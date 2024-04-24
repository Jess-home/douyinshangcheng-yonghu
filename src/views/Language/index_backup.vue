<template>
  <div class="container safari_only">
    <App-Header title="Language" />
    <div class="container-scroll">
      <Setting-Items
        title="Suggested Languages"
        :items="languages"
        :selected-language="selectedLanguage"
        @change="changeLanguage"
      />
      <Setting-Items
        title="Other Languages"
        :items="otherLanguages"
        :selected-language="selectedLanguage"
        @change="changeLanguage"
      />
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/CustomNavBar/index.vue'
import SettingItems from '@/components/SettingItems/index.vue'
const languages = ref([{ name: 'English(UK)' }, { name: 'English' }, { name: 'Bahasa Indonesia' }])
const otherLanguages = ref([
  { name: 'Chineses' },
  { name: 'Croatian' },
  { name: 'Czech' },
  { name: 'Danish' },
  { name: 'Filipino' },
  { name: 'Finland' }
])
const selectedLanguage = ref('English(UK)')
const changeLanguage = (val) => {
  selectedLanguage.value = val
}
</script>
<style lang="scss" scoped>
@import url('@/assets/style/gj.scss');
.container {
  display: flex;
  flex-direction: column;
  .container-scroll {
    height: calc(100vh - 50px);
    padding-top: 1em;
  }
}
</style>
