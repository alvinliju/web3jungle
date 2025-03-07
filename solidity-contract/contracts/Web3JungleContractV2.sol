// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol"; 

contract Web3Jungle is Ownable {

    constructor() Ownable(msg.sender) {

    }

    struct Project{
        uint256 id;
        bool isActive;
        string metadataHash; //IPFS CID
        address owner;
        uint256 upvotes;
    }

    mapping(uint256 => Project) public projects; //creating a hashmap
    mapping(uint256 => mapping (address => bool)) public hasVoted;
    uint256 public projectsCount = 0;

    event projectAdded(uint256 id, string metadataHash, address owner);
    event upVoted(address voter, uint256 projectId);
    event ProjectDeactivated(uint256 indexed projectId);

    function addProject(string memory _metadataHash) public {
        require(bytes(_metadataHash).length > 0, "metadataHash cannot be empty");
        require(bytes(_metadataHash).length == 46 || bytes(_metadataHash).length == 59, "Invalid hash");
        projectsCount++;

        projects[projectsCount] = Project({
            id:projectsCount,
            isActive:true,
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

        uint256 activeCount = 0;

        for(uint i=1; i<=projectsCount; i++){
            if(projects[i].isActive) activeCount++;
        }

        Project[] memory activeProjects = new Project[](activeCount);

        uint256 index;
        for(uint i=1; i <= projectsCount; i ++  ){
            if(projects[i].isActive){
                 activeProjects[index] = projects[i];
                 index++;
            }
           
        }

        return activeProjects;
    }

    function isProjectOwner(uint projectId, address sender) public view returns(bool){
        require(projectId < projectsCount, "Invalid Project ID");
        return projects[projectId].owner == sender;
    }

    function deActivateProject(uint projectId) external {
        require(isProjectOwner(projectId, msg.sender) || owner() == msg.sender, "Unauthorized");

        projects[projectId].isActive = false;
        emit ProjectDeactivated(projectId);
    }
}
