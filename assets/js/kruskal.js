/**
 * 邻接矩阵
 * 值为顶点与顶点之间边的权值，0表示无自环，一个大数表示无边(比如10000)
 * */
const MAX_INTEGER = Number.MAX_SAFE_INTEGER;//没有的边
const MIN_INTEGER = Number.MIN_SAFE_INTEGER;//没有自环

const matrix= [
  [MIN_INTEGER, 9, 2, MAX_INTEGER, 6],
  [9, MIN_INTEGER, 3, MAX_INTEGER, MAX_INTEGER],
  [2, 3, MIN_INTEGER, 5, MAX_INTEGER],
  [MAX_INTEGER, MAX_INTEGER, 5, MIN_INTEGER, 1],
  [6, MAX_INTEGER, MAX_INTEGER, 1, MIN_INTEGER]
];
/**
 * 边对象
 * */
function Edge(begin, end, weight) {
  this.begin = begin;
  this.end = end;
  this.weight = weight;
}

Edge.prototype.getBegin = function () {
  return this.begin;
};
Edge.prototype.getEnd = function () {
  return this.end;
};
Edge.prototype.getWeight = function () {
  return this.weight;
};

/**
 * 邻接矩阵转边集数组的函数
 * @param matrix 邻接矩阵
 * @return Array 边集数组
 * */
function changeMatrixToEdgeArray(matrix) {
  const rows = matrix.length,
    cols = rows,
    result = [];
  for (let i = 0; i < rows; i++) {
    const row = matrix[i];
    for(let j = 0 ; j < cols; j++) {
      if(row[j] !== MIN_INTEGER && row[j] !== MAX_INTEGER) {
        result.push(new Edge(i, j, row[j]));
        matrix[i][j] = MAX_INTEGER;
        matrix[j][i] = MAX_INTEGER;
      }
    }
  }
  result.sort((a, b) => a.getWeight() - b.getWeight());
  return result;
}
/**
 * kruskal算法
 * 遍历所有的边，按权值从小到大排序，每次选取当前权值最小的边，只要不构成回环，则加入生成树
 * 邻接矩阵转换成边集数组
 * 优点：适合点多边少的情况
 * @param matrix 邻接矩阵
 * @return Array 最小生成树的边集数组
 * */
function kruskal(matrix) {
  const edgeArray = changeMatrixToEdgeArray(matrix),
    result = [],
    //使用一个数组保存当前顶点的边的终点,0表示还没有已它为起点的边加入
    savedEdge = new Array(matrix.length).fill(0);

  for (let i = 0, len = edgeArray.length; i < len; i++) {
    const edge = edgeArray[i];
    const n = findEnd(savedEdge, edge.getBegin());
    const m = findEnd(savedEdge, edge.getEnd());
    console.log(savedEdge, n, m);
    //不相等表示这条边没有与现有生成树形成环路
    if (n !== m) {
      result.push(edge);
      //将这条边的结尾顶点加入数组中，表示顶点已在生成树中
      savedEdge[n] = m;
    }
  }
  return result;
}

/**
 * 查找连线顶点的尾部下标
 * @param arr 判断边与边是否形成环路的数组
 * @param start 连线开始的顶点
 * @return Number 连线顶点的尾部下标
 * */
function findEnd(arr, start) {
  //就是一直循环，直到找到终点，如果没有连线，就返回0
  while (arr[start] > 0) {
    start = arr[start];
  }
  return start;
}
