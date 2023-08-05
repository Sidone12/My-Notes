<template>
<div class="card mb-4">
    <div class="card-content">
        <div class="content">
            {{ note.content }}
            <div class="columns is-mobile  has-text-grey-light mt-2">
                <small class="column"><b>Date:</b> {{ dateFormated }} </small>
                <small class="column has-text-right">{{ characterLength }}</small>
            </div>
        </div>
    </div>
    <footer class="card-footer">
        <RouterLink
          :to="`/editNote/${note.id}`"
          class="card-footer-item"
          href="#">Edit
        </RouterLink>
        <a
          @click.prevent="modals.deleteNote = true"
          class="card-footer-item"
          href="#">
            Delete</a>
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote" 
      :noteId="props.note.id"/>
</div>
</template>

<script setup>
/* Imports */
import { computed, reactive } from 'vue'
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'

import { useDateFormat } from '@vueuse/core'



/* Props */
const props = defineProps({
    note: {
        type: Object,
        required: true
    }
})

/* Chaaracter length */
const characterLength = computed(() => {
    let noteLength = props.note.content.length
    let description = noteLength > 1 ? 'characters' : 'character'
    return `${noteLength} ${description}`
})
/* Modals */
const modals = reactive({
    deleteNote: false
})

/* vueUse converting date computed */
const dateFormated = computed(() => {
    let date = new Date(parseInt(props.note.date))
    let formatedDate = useDateFormat(date, 'DD-MM-YYYY @ HH:mm')
    // console.log('formatedDate',formatedDate)
   return  formatedDate.value
})
</script>

<style lang="scss" scoped>

</style>