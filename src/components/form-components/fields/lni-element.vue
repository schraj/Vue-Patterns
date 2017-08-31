<script>
export default {
    props: {
        element: String,
        text: String
    },
    render: function(createElement) {
        return createElement(this.element, this.text);
    }
}
</script>
