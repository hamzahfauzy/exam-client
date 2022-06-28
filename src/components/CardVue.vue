<template>
    <div>
        <div class="card">
            <div class="card-header">
                <slot name="header" />
            </div>
            <div class="card-body">
                <slot name="body" />
            </div>
            <div class="card-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['title','header'],
    }
</script>

<style lang="scss" scoped>

</style>