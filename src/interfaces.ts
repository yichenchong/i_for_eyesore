type Query = string; // CSS Selector query
type HTMLInsert = string;
type Condition = (doc: Document) => boolean;
type CSSFile = string;

interface ConditionalRemoval {
  condition?: Condition;
  query: Query;
};

type UnconditionalRemoval = Query;

type Removal = ConditionalRemoval | UnconditionalRemoval;

interface Replacement {
  condition?: Condition;
  query: Query;
  replacement: HTMLInsert;
}

interface SiteSetting {
  name: string;
  matches: string[];
  css?: CSSFile[];
  removals?: Removal[];
  replacements?: Replacement[];
}

interface AllSettings {
  sites: SiteSetting[];
}