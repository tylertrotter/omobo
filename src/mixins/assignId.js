let id = 0;

export default {
    beforeCreate() {
        this.id = id.toString();
        id += 1;
    },
};