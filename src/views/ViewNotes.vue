<template>
<div class="notes">
    <AddEditNote
      v-model="newNote"
      bgColor="primary-dark"
      placeholder="Add new Note"
      ref="addEditNoteRef"
      >
        <template v-slot:buttons>
            <button
                @click="addNote"
                :disabled="!newNote"
                class="button is-link has-background-success">Add New Notes
            </button>
        </template>
    </AddEditNote>
    <progress v-if="!storeNotes.notesLoaded" class="progress is-small is-success" max="100"/>
    <template v-else>
        <Note :note="note" v-for="note in storeNotes.notes" :key="note.id" />
    </template>
    <div v-if="!storeNotes.notes.length" class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
        No notes here yet....
    </div>
</div>
</template>

<script setup>
/* Imports */
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNote } from '@/stores/storeNotes';
import { useWatchCharacters } from '@/use/useWatchCharacters'

/* Store */
const storeNotes = useStoreNote()

/* Notes */
const newNote = ref('')
const addEditNoteRef = ref(null)

const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusTextArea()
}
useWatchCharacters(newNote)
</script>

<style scoped>

</style>