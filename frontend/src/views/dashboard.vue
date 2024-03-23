<template>
    <div id="dashboardVue" style="width: 100%; height: 100%;">
        <div class="faSB">
            <q-list bordered class="rounded-borders">
                <q-expansion-item
                    switch-toggle-side
                    expand-separator
                    label="Account settings">
                    <q-card>
                        <q-card-section>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                            eveniet doloribus ullam aliquid.
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: 'dashboardVue',
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        axios.get(`/api/datasets/kosis`, {}).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    },
}
</script>