export const categories = [
    {
        _id: "cat1",
        name: "Technologie dsfds sdf sdf sdf sdf sdf sdf sdfdfsdfsdfsd fds",
        color: "#FF5733",
        ownerId: "user123",
        feeds: [
            {
                _id: "feed1",
                url: "https://www.lesnumeriques.com/rss.xml",
                defaultMedia:
                    "https://cdn.lesnumeriques.com/optim/images/logo-LN-rss.png",
                articles: [
                    {
                        _id: "article1",
                        url: "https://techcrunch.com/article-1",
                        title: "Nouveaux smartphones 2025",
                        description:
                            "Présentation des meilleurs smartphones de l'année.",
                        media: "https://fakeimg.pl/300/",
                        date: new Date("2025-05-01"),
                        author: "Alice Martin",
                    },
                    {
                        _id: "article2",
                        url: "https://techcrunch.com/article-2",
                        title: "L'IA révolutionne le développement",
                        description:
                            "Comment les outils d'IA accélèrent la productivité.",
                        media: null,
                        date: new Date("2025-04-20"),
                        author: "Bob Dupont",
                    },
                ],
            },
            {
                _id: "feed2",
                url: "https://thenextweb.com/feed/",
                defaultMedia:
                    "https://cdn.lesnumeriques.com/optim/images/logo-LN-rss.png",
                articles: [
                    {
                        _id: "article3",
                        url: "https://thenextweb.com/ai-2025",
                        title: "Les tendances IA en 2025",
                        description:
                            "Analyse des principales innovations IA cette année.",
                        media: "https://fakeimg.pl/300/",
                        date: new Date("2025-05-18"),
                        author: "Claire Dubois",
                    },
                ],
            },
        ],
    },
    {
        _id: "cat2",
        name: "Santé",
        color: "#33B5FF",
        ownerId: "user123",
        feeds: [
            {
                _id: "feed3",
                url: "https://santenews.fr/rss",
                defaultMedia:
                    "https://cdn.lesnumeriques.com/optim/images/logo-LN-rss.png",
                articles: [
                    {
                        _id: "article4",
                        url: "https://santenews.fr/bien-manger",
                        title: "Bien manger pour mieux vivre",
                        description:
                            "Conseils nutritionnels pour rester en forme.",
                        media: null,
                        date: new Date("2025-03-30"),
                        author: "Dr. Isabelle",
                    },
                ],
            },
        ],
    },
    {
        _id: "cat3",
        name: "Santé 2",
        color: "#33B5FF",
        ownerId: "user123",
        feeds: [],
    },
];
