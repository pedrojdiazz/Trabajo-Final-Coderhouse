export default class UserDTO {
    constructor({ email, role, cart_id, age, first_name, last_name }) {
        this.email = email;
        this.role = role;
        this.cart_id = cart_id;
        this.age = age;
        this.fullname = `${first_name} ${last_name}`;
    }
}