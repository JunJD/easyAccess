import { ResolvedPos, Node } from 'prosemirror-model';
import { Selection, SelectionRange, TextSelection } from 'prosemirror-state';

import { Column } from './Column';
import { ColumnBlock } from './ColumnBlock';
import { findParentNodeClosestToPos } from './utils';
import type { Predicate } from './utils';

type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};

export class ColumnSelection extends Selection {
  constructor(selection: Selection) {
    const { $from, $to } = selection;
    super($from, $to);
    this._$from = $from;
    this._$to = $to;
  }

  _$from: ResolvedPos;
  _$to: ResolvedPos;

  override get $from() {
    return this._$from;
  }

  override get $to() {
    return this._$to;
  }

  map() {
    return this;
  }

  override content() {
    return this.$from.doc.slice(this.from, this.to, true);
  }

  eq(other: Selection): boolean {
    return other instanceof ColumnSelection && other.anchor == this.anchor;
  }

  toJSON(): any {
    return { type: 'column', from: this.from, to: this.to };
  }

  expandSelection(doc: Node) {
    // 找到选择开始的第一个祖先
    const where: Predicate = ({ pos, node }) => {
      if (node.type.name === Column.name) {
        return true;
      }
      return doc.resolve(pos).depth <= 0;
    };
    const { pos: fromPos } = findParentNodeClosestToPos(this.$from, where);
    this._$from = doc.resolve(fromPos);

    // 找到选择结束的第一个祖先
    const { pos: toPos, node: toNode } = findParentNodeClosestToPos(this.$to, where);
    console.log('node', toNode)
    this._$to = doc.resolve(toPos + toNode.nodeSize);

    if (this.getFirstNode()?.type.name === ColumnBlock.name) {
      const offset = 0;
      this._$from = doc.resolve(this.$from.pos + offset);
      this._$to = doc.resolve(this.$to.pos + offset);
    }

    const mutableThis = this as Mutable<ColumnSelection>;
    mutableThis.$anchor = this._$from;
    mutableThis.$head = this._$to;
    mutableThis.ranges = [new SelectionRange(this._$from, this._$to)];
  }

  /// 从未解析的位置创建节点选择。
  static create(doc: Node, from: number, to: number) {
    const $from = doc.resolve(from);
    const $to = doc.resolve(to);
    const selection = new TextSelection($from, $to);
    return new ColumnSelection(selection);
  }

  getFirstNode() {
    return this.content().content.firstChild;
  }
}