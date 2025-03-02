// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Web3Jungle {

    struct Project{
        uint256 id;
        string metadataHash; //IPFS CID
        address owner;
        uint256 upvotes;
    }

    mapping(uint256 => Project) public projects; //creating a hashmap
    mapping(uint256 => mapping (address => bool)) public hasVoted;
    uint256 public projectsCount = 1;

    event projectAdded(uint256 id, string metadataHash, address owner);
    event upVoted(address voter, uint256 projectId);

    function addProject(string memory _metadataHash) public {
        require(bytes(_metadataHash).length > 0, "metadataHash cannot be empty");
        require(bytes(_metadataHash).length == 46 || bytes(_metadataHash).length == 59, "Invalid hash");
        projectsCount++;

        projects[projectsCount] = Project({
            id:projectsCount,
            metadataHash: _metadataHash,   
            owner:msg.sender, 
            upvotes:0
        });

        emit projectAdded(projectsCount, _metadataHash, msg.sender);

    }

    function upVote(uint256 _projectId) public {
        require(_projectId > 0 && _projectId<=projectsCount, "Invalid Project ID" );
        require(!hasVoted[_projectId][msg.sender], "You already voted");

        projects[_projectId].upvotes++;
        hasVoted[_projectId][msg.sender] = true;

        emit upVoted(msg.sender, _projectId);
    }


    function getAllProjects() public view returns(Project[] memory) {

        Project[] memory allProjects = new Project[](projectsCount);

        for(uint256 i=1; i <= projectsCount; i ++  ){
            allProjects[i-1] = projects[i];
        }

        return allProjects;
    }
}