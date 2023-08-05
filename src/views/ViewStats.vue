<template>
<div class="stats">
    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>Stat</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Number of Notes</td>
                <td>{{storeNotes.totalNoteCounts}}</td>
            </tr>
            <tr>
                <td>Number of Characters</td>
                <td>{{storeNotes.totalCharacters}}</td>
            </tr>
        </tbody>
    </table>
</div>
<input
  v-model="loveNoteBolls"
  v-autofocus
  class="input"
  placeholder="Do you lovw noteballs"
  type="text">
</template>

<script setup>
import { ref } from 'vue'
import { useStoreNote } from '@/stores/storeNotes';
import { vAutofocus } from "@/directives/vAutofocus"
import { useWatchCharacters } from '@/use/useWatchCharacters'


/* Store */
const storeNotes = useStoreNote()


const loveNoteBolls = ref('')

/* Watch characters */
useWatchCharacters(loveNoteBolls, 50)
</script>

<style scoped>

</style>