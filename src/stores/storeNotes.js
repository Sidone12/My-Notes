import { defineStore } from 'pinia'
/* import */
import {
    collection, onSnapshot,
    doc, deleteDoc,
    updateDoc, query,
    orderBy, addDoc
} from 'firebase/firestore';
import { db } from '@/js/firebase'

import { useStoreAuth } from '@/stores/storeAuth';

let notesCollectionRef
let notesCollectionQueryRef

let getNotesSnapshot = null



export const useStoreNote = defineStore('storeNote', {
    state: () => ({
        notes: [
        ],
        notesLoaded: false
    }),
    actions: {
        // add user id for handeling whu is online fron storeAuth
        init() {
            //initialize our data refs

            const storeAuth = useStoreAuth()
            // console.log('user store id',storeAuth.user.id)
            notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
            notesCollectionQueryRef = query(notesCollectionRef, orderBy('date', 'desc'));
            this.getNotes()
        },

        // get info from firebase and update in real time
        async getNotes() {
            this.notesLoaded = false

            if (getNotesSnapshot) getNotesSnapshot() // unsubsribe from any active listener

            getNotesSnapshot = onSnapshot(notesCollectionQueryRef, (querySnapshot) => {
                // console.log('querySnapshot',querySnapshot)
                let notes = []
                querySnapshot.forEach((doc) => {
                    let note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date
                    }
                    // console.log('note',note )
                    notes.push(note)
                })
                // just for example
                // setTimeout(() => {       
                this.notes = notes
                this.notesLoaded = true
                //    },2000)
            }, error => {
                console.log('error message', error.message)
            })
        },
        clearNotes() {
            this.notes = []
        },
        async addNote(newNoteContent) {
            // console.log('add new note',newNoteContent)
            let currentDay = new Date().getTime(),
                date = currentDay.toString()

            // Add a new document with a generated id.
            await addDoc(notesCollectionRef, {
                content: newNoteContent,
                date: date
            })
        },
        async deleteNote(idToDelete) {
            // console.log(idToDelete)
            await deleteDoc(doc(notesCollectionRef, idToDelete));
        },
        async updateNote(id, content) {
            // Set the 'capital' field of the city 'DC' fireBase
            await updateDoc(doc(notesCollectionRef, id), {
                content: content
            })

        }
    },
    getters: {
        getNoteContent: (state) => {
            return (id) => {
                return state.notes.filter(note => { return note.id === id })[0].content
            }
        },
        totalNoteCounts: (state) => {
            return state.notes.length
        },
        totalCharacters: (state) => {
            let count = 0
            state.notes.forEach(note => {
                count += note.content.length
            })
            return count
        }
    }
})