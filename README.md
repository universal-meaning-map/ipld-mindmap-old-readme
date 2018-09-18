# IPLD Mindmap (ssh?)

## Context
We're in a personal contest to understand and try to change how do we organize our own information, and how it relates to others. The full explanation of why and how is something we're working on.

Since the scope of the project is inmense, we're going to tackle small projects to get insight, while creating new tools to allow new ways to relate to information.

This is the first "project" we try to tackle. While creating a tool is the main goal, is likley that we will also be exploring  working frameworks and different documentation praxis.

Documentation is important to us, because we are looking to solve problems in the best way possible, so if the logic behind is not good enough, we want to know. And probably you can help!

:)

## Mindmap
We like the idea of mindmap, a tool that allows to organize information in the way that your brain works and not in a simplified way restricted by a user interface or a data structure.

[The wikpedia entry](https://en.wikipedia.org/wiki/Mind_map) says that mindmaps are hierachical and around a single concept. Our aproach is more generic. We want a tool to organize our brain, and this implies non hierachical structures.

## Original specs

- [ ] Create a tool that would allow to represent what you could do in a analog mindmap, but in a digital format.
- [ ] The main goal is to design and justifiy the correct data structure.
    - [ ] It needs to work on a global domain. This means that two different mindmaps pointing to the same concept should converge if put together
    - [ ] It extends [IPLD](https://ipld.io/)
    - [ ] As simple as possible
    - [ ] As generic as possible (can cover as many usecases as possible)
    - [ ] Any type of data should be able to be referenced
- [ ] Eventually we'll explore authorship, accessibility, networking... but not yet.
- [ ] It should have some basic visualization
- [ ] The tool is render agnostic. Diferent renders can be eventually used.
- [ ] We should document the process and the reasoning behind as close as possible
- [ ] It should work on the web. Because of ease of use and development.
- MVP approach. Keep things lean.
- [ ] Nice to have
    - [ ] Load content and render via IPFS
    - [ ] Compatible with any IPLD object

Deadline: end of September 2018

## Data structure

### Nodes in the global domain
For _Global domain_ we understand that there is only one single giant mindmap.

Which means that we need to be able to break in down into smaller subsets/pieces. The atomic piece of a mindmap is a node.

This implies that each node needs to contain and describe the relationships with all the other nodes it is interested, because if broken apart, it will loose information it cares about.

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

A node can have an arbitrary number of relationships. For ease of use, and to save some memory this seems the logical representation:

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
To define a relationship we need two nodes and a definition of the type of relationship they have between them.


Because the selfish behaviour of a node described above, a reltionship is always described from the perspective of the node being represented towards the `destination node`

```
[
    {
        nodeName:"Son",
        relationships: [
            {
                destinationNode: "Dad"
                type: "Is my dad"
            }
        ]
    },
    {
        nodeName:"Dad",
        relationships: [
            {
                destinationNode: "Son"
                type: "Is my son"
            }
        ]
    },
]
```
The selfhish behaviour implies that there is no way to guarantee the integrity of the information, since the nodes could express conflicting information. And that's ok.

```
[
    {
        nodeName:"Son",
        relationships: [
            {
                destinationNode: "Dad"
                type: "Is NOT my dad"
            }
        ]
    },
    {
        nodeName:"Dad",
        relationships: [
            {
                destinationNode: "Son"
                type: "Is my son"
            }
        ]
    },
]
```
### Infinite relationship types
Because one of the goals is to limit as little as possible the information represented, we need to allow for any type of relationship. And this means that there may be any arbitrary number of types.

### Render vs structure
_This is a work in progress_

If we take a classic mindmap, the connections and nodes may have different shapes, sizes, colors... This is what the render should do. It needs to understand the relationships and the nodes so they can be drawn.

It would be easy to add properties such as "color", so the render can pick it up. But unless this is something intrinsic of the node or relationship, should be left out of the equation.

This is because the final goal is to be able capture and organize concepts, and not to visualize them in a specific way. We need to keep the data render agnostic. It just happen that we choose a mindmap like render to start exploring how to organize and render this type of data.




## Log
- `13/09/2018`:  We've figured out a basic data structure to start. Defined in the section above