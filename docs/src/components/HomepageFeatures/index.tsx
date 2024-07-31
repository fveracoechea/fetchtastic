import { ReactNode } from 'react';

import Heading from '@theme/Heading';
import clsx from 'clsx';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Lightweight',
    Svg: require('@site/static/img/undraw_lightweight.svg').default,
    description: 'Less than 3kB gzipped',
  },
  {
    title: 'Composable',
    Svg: require('@site/static/img/undraw_building_blocks.svg').default,
    description: 'Safely reuse previous configurations',
  },
  {
    title: 'Intuitive',
    Svg: require('@site/static/img/undraw_intuitive.svg').default,
    description: 'Clean and easy to use API',
  },
  {
    title: 'Type safe',
    Svg: require('@site/static/img/undraw_code_typing.svg').default,
    description: 'Strongly typed, written in TypeScript',
  },
  {
    title: 'Isomorphic',
    Svg: require('@site/static/img/undraw_design_components.svg').default,
    description: 'Compatible with browsers, Node.js and Deno',
  },
  {
    title: 'Well Tested',
    Svg: require('@site/static/img/undraw_security.svg').default,
    description: 'Covered by unit tests',
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
