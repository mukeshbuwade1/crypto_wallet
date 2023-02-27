


/**
 * @param {string} lightModeValue
 * @param {string} darkModeValue
 */

import { useSelector } from "react-redux"

export function useColorModeValue(lightModeValue,darkModeValue)  {
    const { theme: { isDark } } = useSelector(s => s)

    return isDark? darkModeValue:lightModeValue

}