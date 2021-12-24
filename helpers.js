const buildTree = (data) => {
  const flattedData = Object.values(data).reduce((flattedData, data) => {
    return [...flattedData, ...data]
  }, [])
  const findChildren = (nodes, parentId) => {
    const children = nodes.filter(node => node.parent_id === parentId)
    if (children.length) {
      return children.map(node => { return { ...node, children: [...node.children, ...findChildren(nodes, node.id)] } })
    }
    return children
  }

  return findChildren(flattedData, null)
}

module.exports = { buildTree }