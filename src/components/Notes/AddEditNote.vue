<template>
<div>
    <div class=" p-4 mb-5 box " :class="`has-background-${bgColor}`">
        <label v-if="label" class="label has-text-white">{{label}}</label>
        <div class="field">
            <div class="control">
                <textarea
                  v-autofocus
                  :placeholder="placeholder"
                  :value="modelValue"
                  @input="$emit('update:modelValue', $event.target.value)"
                  class="textarea"
                  maxlength="100"
                  ref="textareaRef" />
            </div>
        </div>
        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <slot name="buttons"></slot>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
/* Imports */
import { ref } from 'vue'
import { vAutofocus } from "@/directives/vAutofocus"

/* Props */
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        default: 'primary'
    },
    placeholder: {
        type: String,
        default: 'Type something...'
    },
    label: {
        type: String
    }
})
/* Emits */
const emit = defineEmits(['update:modelValue'])

/* Focus textarea */
const textareaRef = ref(null)

const focusTextArea = () => {
    // console.log('focusTextArea')
    textareaRef.value.focus()
}
defineExpose({
    focusTextArea
})
</script>

<style lang="scss" scoped>

</style>