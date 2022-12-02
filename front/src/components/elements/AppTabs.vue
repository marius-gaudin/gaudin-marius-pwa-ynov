<template>
    <div class="tabs">
        <div class="q-gutter-y-md shadow-2">
            <q-tabs
                v-model="tab"
                narrow-indicator
                dense
                align="justify"
                class="text-grey"
            >
                <q-tab :ripple="false" name="" icon="sort" />
                <q-tab :ripple="false" name="add" icon="add" class="add" />
                <q-tab :ripple="false" name="" icon="person" />
            </q-tabs>
        </div>
    </div>
</template>
<script>
</script>
<style scoped>
    :deep() .add {
        opacity: 1;
    }
    :deep() .add .q-tab__content {
        background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
        color: white;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        margin: .5rem 0;
    }

    :deep() .q-icon {
        font-size: 1.8rem;
    }
    .tabs {
        background-color: white;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        z-index: 1;
    }
</style>
