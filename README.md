# IPLD Mindmap

## Context
We're in a personal contest to understand and try to change how do we organize our own information, and how it relates to others.

Since the scope of the project is inmense, we're going to tackle small projects to get insight, while creating new tools to relate to information.

This is the first "project" we try to tackle. While creating a tool is the main goal, we also want to explore working frameworks and diferent documentation praxis.

## Mindmap
We like the idea of mindmap, a tool that allows to organize information in the way that your brain works and not in a simplified way restricted by a user interface or a data structure.

In the wikpedia entry says that mindmaps are hierachial and around a single concept. We don't care about that.

## Original specs

- [ ] Create a tool that would allow to represent what you could do in an analog mindmap in a digital format.
- [ ] The priority is to design the proper data structure.
    - [ ] It needs to work on a global domain. This means that two different mindmaps pointing to the same concept should converge if put together
    - [ ] Extending IPLD
    - [ ] As simple as possible
    - [ ] As generic as possible. Can cover as many usecases as possible
    - [ ] Any type of data should be able to be referenced
- [ ] Eventually we'll explore authorship, accessibility, networking... but not yet.
- [ ] It should have some basic visualization
    - [ ] The tool is render agnostic
    - [ ] The render should be any piece of data that can understand the data structure 
- [ ] We should document the process and the reasoning behind as close as possible
- [ ] Via web
    - [ ] Because of ease of use and development, a tool that works on the web first seems logical
- [ ] Nice to have
    - [ ] Load content and ui via IPFS
    - [ ] Should be compatible with any IPLD object


## Data structure

### Nodes in the global domain
Because the mind maps could live on a global domain, they need to be able to be broken into pieces.
The atomic piece of a mindmap is a node.

This implies that each node needs to contain and describe the relationships with all the other nodes it is interested, since, if broken apart, it will loose information it cares about.

It makes a node behave selfishly, which is the logical behaviour in a distributed system.

Since we're in a global domain we will need to represent a subset of the global mindmap.

A subset representation of the mindmap will then be just a lists of nodes.

```
[
    {
        nodeName:"Node1"
    },
    {
        nodeName:"Node2"
    },
]
```

### Relationships and nodes
We understand relationship as how a node relates to another node.

A node can an arbitrary number of relationships. For ease of use,and to save some memmory this seems the logical representation:

```
[
    {
        nodeName:"Node1",
        relationships: [ relationship1, relationship2]
    },
    {
        nodeName:"Node2",
        relationships: []
    },
]
```

But because we're on a global domain, the same node may have difrent relationships in a different subset of the mindmap. This implies that it can also be represented like this:

```
[
    {
        nodeName:"Node1",
        relationships: [ relationship1]
    },
    {
        nodeName:"Node1",
        relationships: [ relationship2]
    },
    {
        nodeName:"Node2",
        relationships: []
    },
]
```

### Relationship definition
To define a relationship we need two nodes and the type of relationship

Because the selfish behaviour of a node described above, a reltionship is described from the perspective this node.


## Log
- 13/09/2018 : We've figured out a basic data structure to start. Defined in the section above