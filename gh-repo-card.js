window.addEventListener('DOMContentLoaded', async function () {
    const colors = await fetch('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json').then((response) => response.json());
    const emojis = await fetch('https://api.github.com/emojis').then((response) => response.json());

    async function GetRepoAsync(name) {
        const repo = await fetch(`https://api.github.com/repos/${name}`)
            .then((response) => response.json());

        if (repo.description)
            await [...repo.description.matchAll(/:\w+:/g)].forEach((em) => {
                const e_name = em[0].substring(1, em[0].length - 1);
                const e_url = emojis[e_name];
                const emoji = `<img src="${e_url}" height="14">`;
                repo.description = repo.description.replace(em[0], emoji);
            });

        const forks =
            `<a href="https://github.com/${repo.full_name}/forks"
                   style="color: currentColor !important; text-decoration:none; margin-left:16px">
                   <svg style="fill: currentColor !important; vertical-align: text-bottom;" aria-label="forks"
                       role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                       data-view-component="true" class="octicon octicon-repo-forked">
                       <path
                           d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z">
                       </path>
                   </svg>
                   ${Math.abs(repo.forks) > 999 ? Math.sign(repo.forks) * ((Math.abs(repo.forks) / 1000).toFixed(1)) + 'k' : Math.sign(repo.forks) * Math.abs(repo.forks)}
             </a>`

        const stars =
            `<a href="https://github.com/${repo.full_name}/stargazers"
                 style="color: currentColor !important; text-decoration:none">
                 <svg style="fill: currentColor !important; vertical-align: text-bottom;" aria-label="stars"
                     role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                     data-view-component="true" class="octicon octicon-star">
                     <path
                         d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z">
                     </path>
                 </svg>
                ${Math.abs(repo.watchers) > 999 ? Math.sign(repo.watchers) * ((Math.abs(repo.watchers) / 1000).toFixed(1)) + 'k' : Math.sign(repo.watchers) * Math.abs(repo.watchers)}
             </a>`

        const repo_card = `
                    <div
                        style="display:flex; color: #656d76 !important; height: 100%; border: 1px solid #d0d7de; border-radius: 6px; padding: 16px !important; font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji; font-size: 14px">
                        <div>
                            <div style="display:flex; width:100%; position:relative">
                                <div>
                                    <svg style="fill: currentColor !important; display: inline-block; overflow: visible !important; vertical-align: text-bottom; margin-right: 8px;"
                                        viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z">
                                        </path>
                                    </svg>
                                    <a style="font-weight: 600; text-decoration:none;"
                                        href="${repo.html_url}">
                                        <span style="font-size:14px; color: #0969DA"
                                            title="${repo.name}">${repo.name}</span>
                                    </a>
                                </div>
                            </div>

                            <p style="color: currentColor !important;; margin-top: 8px; font-size:12px; text-align: left;">
                            ${repo.description == null ? "" : repo.description}
                            </p>

                            <p style="margin-bottom: 0 !important; margin-top:8px; font-size:12px; text-align: left;">
                                <span style="margin-right:16px; display:inline-block !important; height: 18px;">
                                    <span
                                        style="background-color: ${colors[repo.language]?.color}; position: relative; top: 1px; display: inline-block !important; width: 12px; height: 12px; border-radius: 50%;">
                                    </span>
                                    ${repo.language == null ? "" : repo.language}
                                </span>                                

                                ${repo.watchers > 0 ? stars : ''}
                                ${repo.forks > 0 ? forks : ''}
                            </p>
                        </div>
                    </div>
`
        return repo_card;
    }
    document.querySelectorAll('[data-repo]').forEach(async (elem) => {
        const re_address = elem.dataset.repo.replace(/\s\s+/g, ' ');
        const card = await GetRepoAsync(re_address)
        elem.innerHTML = card;
    });
});