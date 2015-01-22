module encyptionVM {
    import ko from "vendor/knockout";
    export function(o){
        var original=ko.observable(o),
            encrypted=ko.observable(),
            decrypted=ko.observable();

        function encrypt(){

        }
        function decrypt(){

        }

        encrypt().
        then(()=>{
            decrypt();
        });

        return {
            original,
            encrypted,
            decrypted
        };
    };
}
