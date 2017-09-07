//codigo antigo, não pertence a baseline

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

import ContaModel from '../../../models/conta';

export default {
  type: GraphQLBoolean,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    let removedConta = await ContaModel
      .findOneAndRemove({$and:[{republica: options.republica}, {_id: params.id}]})

    if (!removedConta) {
      throw new Error('Error removing conta');
    }

    return true;
  }
};
