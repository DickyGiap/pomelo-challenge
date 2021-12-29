const findChildren = (nodes, parentId) => {
  const children = nodes.filter((node) => node.parent_id === parentId);
  if (children.length) {
    return children.map((node) => {
      return {
        ...node,
        children: [...node.children, ...findChildren(nodes, node.id)]
      };
    });
  }

  return children;
};

const buildTree = (data) => {
  const nodes = Object.values(data).reduce((flattedArray, value) => {
    return [...flattedArray, ...value];
  }, []);

  return findChildren(nodes, null);
};

module.exports = { buildTree };
