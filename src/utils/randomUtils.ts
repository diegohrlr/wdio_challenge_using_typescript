/**
 * @author drodriguez
 * @date 08-31-2025
*/

export default new class RandomUtils {
    /**
     * Will return a random alphanumeric string
     * @param length 8 as default
     */
    randomString(length: number = 8): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let result = ''
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }

    /**
     * Will get the current timestamp
     * @param inSeconds To get the timestamp in seconds, default is milliseconds
     */
    timestamp(inSeconds: boolean = false): number {
        return inSeconds ? Math.floor(Date.now() / 1000) : Date.now()
    }

}