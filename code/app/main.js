requirejs(["require-config"], function () {
    requirejs(["knockout", "example-vm"],
        function (ko, vm) {
            ko.applyBindings(vm({
                loadFriends: 255,
                generateFeed: 100
            }));
        });
});