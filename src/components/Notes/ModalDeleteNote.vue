<template>
<div class="modal is-active p-4">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
        <header class="modal-card-head">
            <p class="modal-card-title">Delete Note?</p>
            <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
            <!-- Content ... -->
            Are you sure to delete this note?
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
            <button class="button" @click="closeModal">Cancel</button>
            <button
              @click="storeNotes.deleteNote(noteId)"
              class="button is-danger">Delete
            </button>
        </footer>
    </div>
</div>
</template>

<script setup>
/* imports */
import { ref, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreNote } from '@/stores/storeNotes';

/* Store */
const storeNotes = useStoreNote()

/* props */
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    noteId: {
        type: String,
        required: true
    }
})
/* close modal */
const closeModal = () => {
    // console.log('close modal')
    emit('update:modelValue', false)
}
/* vueUse click outside to close  */
const modalCardRef = ref(null)

onClickOutside(modalCardRef, closeModal)

/* emits */
const emit = defineEmits(['update:modelValue'])

/* keyboard control */
const handleKeyboard = e => {
    console.log(e)
    if (e.key === 'Escape') closeModal()
}

onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
})
onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard)
})
</script>

<style lang="scss" scoped>

</style>