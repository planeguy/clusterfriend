define(function () {
    return {
        hex2bin: function convert_formated_hex_to_bytes(hex_str) {
            var count = 0,
                hex_arr,
                hex_data = [],
                hex_len,
                i;

            if (hex_str.trim() == "") return [];

            /// Check for invalid hex characters.
            if (/[^0-9a-fA-F\s]/.test(hex_str)) {
                return false;
            }

            hex_arr = hex_str.split(/([0-9a-fA-F]+)/g);
            hex_len = hex_arr.length;

            for (i = 0; i < hex_len; ++i) {
                if (hex_arr[i].trim() == "") {
                    continue;
                }
                hex_data[count++] = parseInt(hex_arr[i], 16);
            }

            return hex_data;
        },
        bin2hex: function convert_to_formated_hex(byte_arr) {
            var hex_str = "",
                i,
                len,
                tmp_hex;

            if (!Array.isArray(byte_arr)) {
                return false;
            }

            len = byte_arr.length;

            for (i = 0; i < len; ++i) {
                if (byte_arr[i] < 0) {
                    byte_arr[i] = byte_arr[i] + 256;
                }
                tmp_hex = byte_arr[i].toString(16);

                /// Add leading zero.
                if (tmp_hex.length == 1) tmp_hex = "0" + tmp_hex;

                if ((i + 1) % 16 === 0) {
                    tmp_hex += "\n";
                } else {
                    tmp_hex += " ";
                }

                hex_str += tmp_hex;
            }

            return hex_str.trim();
        },
        bin2str: function (byte_arr) {
            var str_str = "",
                i,
                len;

            if (!Array.isArray(byte_arr)) {
                return false;
            }

            len = byte_arr.length;

            for (i = 0; i < len; ++i) {
                if (byte_arr[i] < 0) {
                    byte_arr[i] = byte_arr[i] + 256;
                }
                str_str += String.fromCharCode(byte_arr[i]);
            }

            return str_str;
        },
        str2bin: function (str) {
            var count = 0,
                str_data = [],
                str_len,
                i;

            str_len = str.length;
            for (i = 0; i < str_len; ++i) {
                str_data[count++] = parseInt(str.charCodeAt(i));
            }
            return str_data;
        }
    };
});