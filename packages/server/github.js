const { GraphQLClient } = require("graphql-request");

const url = "https://api.github.com/graphql";
const token = process.env.GITHUB_API_TOKEN;

const client = new GraphQLClient(url, {
  headers: { Authorization: `Bearer ${token}` }
});

const query = `
{
  viewer {
    contributionsCollection() {
      commitContributionsByRepository {
        repository { nameWithOwner url owner {avatarUrl} },
        contributions (first: 1, orderBy: {field: OCCURRED_AT, direction: DESC}) {
          nodes { occurredAt commitCount }
        }
      }
      pullRequestContributionsByRepository  {
        repository { nameWithOwner url owner {avatarUrl} }
        contributions (first: 1, orderBy: {field: OCCURRED_AT, direction: DESC}) {
          nodes { occurredAt pullRequest { title } }
        }
      }
      issueContributionsByRepository {
        repository { nameWithOwner url owner {avatarUrl} }
        contributions (first: 1, orderBy: {field: OCCURRED_AT, direction: DESC}) {
          nodes{ occurredAt issue { title } }
        }
      }
    }
  }
}
`;

exports.handler = async () => {
  const content = await client.request(query);
  const contributions = content.viewer.contributionsCollection;
  const flattened = [
    ...contributions.commitContributionsByRepository.map(commit => {
      const repo = commit.repository;
      const contribs = commit.contributions.nodes[0];
      const plural = contribs.commitCount > 1 ? "s" : "";
      return {
        title: repo.nameWithOwner,
        image: repo.owner.avatarUrl,
        date: new Date(contribs.occurredAt),
        link: repo.url,
        description: `${contribs.commitCount} commit${plural}`
      };
    }),
    ...contributions.pullRequestContributionsByRepository.map(pr => {
      const repo = pr.repository;
      const contrib = pr.contributions.nodes[0];
      return {
        title: repo.nameWithOwner,
        image: repo.owner.avatarUrl,
        date: new Date(contrib.occurredAt),
        link: repo.url,
        description: `PR: ${contrib.pullRequest.title}`
      };
    }),
    ...contributions.issueContributionsByRepository.map(issue => {
      const repo = issue.repository;
      const contrib = issue.contributions.nodes[0];
      return {
        title: repo.nameWithOwner,
        image: repo.owner.avatarUrl,
        date: new Date(contrib.occurredAt),
        link: repo.url,
        description: `Issue: ${contrib.issue.title}`
      };
    })
  ];
  const merged = flattened.reduce((acc, contrib) => {
    const existing = acc.find(
      existingContrib => existingContrib.title === contrib.title
    );
    if (existing) {
      if (existing.date.getTime() < contrib.date.getTime()) {
        existing.date = contrib.date;
        existing.description = `${contrib.description}, ${
          existing.description
        }`;
      } else {
        existing.description = `${existing.description}, ${
          contrib.description
        }`;
      }
      return acc;
    }
    acc.push(contrib);
    return acc;
  }, []);
  const sorted = merged.sort((a, b) => b.date.getTime() - a.date.getTime());
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sorted)
  };
};
