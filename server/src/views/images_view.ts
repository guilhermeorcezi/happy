import Image from '../models/Image';

export default {
  render(image: Image): any {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(image: Image[]): any {
    return image.map(image => this.render(image));
  },
};
