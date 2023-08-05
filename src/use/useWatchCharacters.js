import { watch } from 'vue'

export function useWatchCharacters(valueToWatch, maxChars = 100) {
watch(valueToWatch, (valueToWatch) => {
    if (valueToWatch.length === maxChars) {
        alert(`No more than ${maxChars} characters allowed!`)
    }
})
}
