//codigo antigo, não pertence a baseline

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

import MoradorModel from '../../../models/morador';

export default {
  type: GraphQLBoolean,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    let removedMorador = await MoradorModel
      .findOneAndRemove({$and:[{republica: options.republica}, {_id: params.id}]})

    if (!removedMorador) {
      throw new Error('Error removing conta');
    }

    return true;
  }
};
