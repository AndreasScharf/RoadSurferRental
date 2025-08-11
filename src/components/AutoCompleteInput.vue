<template>
    <div class="form-group mb-3">
        <label v-if="title" class="input-datalist text-start d-block">{{ title }}</label>
        <input class="form-control" type="text" v-model="valueInput" placeholder="Search..." />
        <ul class="list-group" v-if="filteredItems.length && openSuggestions">
            <li v-for="item in filteredItems" :key="item.id" class="list-group-item" v-on:click="selectItem(item)">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script> 
export default {
    name: "AutoCompleteInput",
    props: {
        title: { type: String, default: '' },

        modelValue: String,
        items: Array,

    },
    computed: {
        valueInput: {
            get() {
                return this.modelValue;
            },
            // put query call and update here
            // to excute on every input change
            set(newValue) {
                this.searchTerm = newValue;
                // for update the v-model binding
                this.$emit('update:modelValue', newValue);

                // emit different call for the query
                this.$emit('query', newValue);

                this.openSuggestions = true; // open suggestions on input change
            }
        },      

        filteredItems() {
            
            return this.items.filter(item => 
                item.name.toLowerCase().includes(this.valueInput.toLowerCase())
            );
        }
    },  
    methods: {
        selectItem(item) {
            this.searchTerm = item.name;

            this.openSuggestions = false; // close suggestions after selection

            // only call the update, to prevent query call
            this.$emit('update:modelValue', item.name);

            this.$emit('select', item);

        }
    },

    data() {
        return {
            searchTerm: '',
            openSuggestions: false // control for hiding suggestions after selection
        };
    },
   
   
}
</script>

