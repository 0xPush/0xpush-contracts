// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract PushStorage {
    mapping(address => Push) public pushes;

    event Created(Push);

    struct Push {
        address creator;
        string data;
    }

    function read(address _address) public view returns (Push memory) {
        return pushes[_address];
    }

    function write(address _address, string memory _data) public {
        require(_address != address(0), "empty_address");

        Push memory push = pushes[_address];

        if (push.creator != address(0) && push.creator != msg.sender) {
            revert("not_push_creator");
        }

        pushes[_address] = Push(msg.sender, _data);
        emit Created(pushes[_address]);
    }
}
