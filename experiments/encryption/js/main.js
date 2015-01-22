import encryptionVM from 'encryptionVM';
import ko from 'vendor/knockout';
var vm = encryptionVM(JSON.stringify({
    "id":3,
    "date":"20150101",
    "reply":"http://clusterfriend.com/pixelant3/feed#7",
    "text":"i can't even",
    "image":"http://www.clickhole.com/images/dog-hates-kenzian-econom.png"
}));

ko.applyBindings(vm);
