<template>
    <div class="edit-note">
      <AddEditNote
          v-model="noteContent"
          bgColor="primary"
          placeholder="Change note"
          ref="addEditNoteRef"
          label="Edit Note">
        <template v-slot:buttons>
            <button
                @click="$router.back()"
                class="button is-link is-light mr-4">Cancel
            </button>
            <button
                @click="handleSaveClick"
                :disabled="!noteContent"
                class="button is-link has-background-primary-dark">Save Note
            </button>
        </template>
    </AddEditNote>
    </div>
</template>

<script setup>
/* Imports */
import { ref } from 'vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNote } from '@/stores/storeNotes';
import { useRoute, useRouter } from 'vue-router'

/* Router */
const route = useRoute()
const router = useRouter()

/* Store */
const storeNotes = useStoreNote()

/* Note */
const noteContent = ref('')
// console.log(route.params.id)
noteContent.value = storeNotes.getNoteContent(route.params.id)

/* Save click */
const handleSaveClick = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
}
</script>

<style lang="scss" scoped>

</style>