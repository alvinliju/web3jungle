// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Web3JungleContract {

    struct Project{
        uint256 id;
        string name;
        string description;
        string link;
        string projectImageurl;
        address owner;
        uint256 upvotes;
    }

    mapping(uint256 => Project) public projects; //creating a hashmap
    mapping(uint256 => mapping (address => bool)) public hasVoted;
    uint256 public projectsCount = 1;

    event projectAdded(uint256 id, string name, string projectImageurl,  string description, string link, address owner);
    event upVoted(address voter, uint256 projectId);

    function addProject(string memory _name,string memory _projectImageurl, string memory _description, string memory _link ) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_projectImageurl).length > 0, "Image url cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_link).length > 0, "Link cannot be empty");


        projectsCount++;

        projects[projectsCount] = Project({
            id:projectsCount,
            name:_name,
            description:_description,
            projectImageurl:_projectImageurl,
            owner:msg.sender, 
            link:_link,
            upvotes:0
        });

        emit projectAdded(projectsCount, _name, _projectImageurl,   _description, _link, msg.sender);

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