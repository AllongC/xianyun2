import { Message } from "element-ui"

export default function ({ $axios }) {
    $axios.onError(error => {
        const { statusCode, message } = error.response.data
        if (statusCode == 400) {
            Message.error(message)
        }
    })
}