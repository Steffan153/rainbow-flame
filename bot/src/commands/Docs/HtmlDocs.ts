import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { removeHTMLTags } from "../../Utils";
import { loading } from "../../Emojis";
import { colors } from "../../Config";

export default class HtmlDocsCommand extends Command {
  public constructor() {
    super("htmldocs", {
      aliases: ["htmldocs", "html-docs", "html"],
      category: "Docs",
      description: {
        content: "Search for an html element",
        usage: "htmldocs <query:string>",
        examples: ["htmldocs div"],
      },
      ratelimit: 3,
      args: [
        {
          id: "query",
          type: "string",
          match: "rest",
          prompt: {
            start: (msg: Message) => `you need to specify a query!`,
          },
        },
      ],
    });
  }

  public async exec(
    message: Message,
    { query }: { query: string }
  ): Promise<any> {
    const msg = await message.util.send(`${loading} Searching...`);
    const data = await this.client.apis.duckDuckGo.searchInstant(
      `html ${query}`
    );
    if (!data || !data.AbstractURL.length || !data.Abstract.length)
      return msg.edit(`:x: No information found for query \`${query}\`.`);
    return msg.edit(
      `:white_check_mark: Found information for query \`${query}\`!`,
      new MessageEmbed()
        .setColor(colors.info)
        .setAuthor(
          `HTML (${data.AbstractSource})`,
          "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png"
        )
        .setDescription(
          `${removeHTMLTags(
            data.Abstract.replace(/(\<|\<\/)code\>/gi, "```")
          )}[Learn More](${data.AbstractURL})`
        )
        .setFooter(
          "Powered by DuckDuckGo",
          "https://duckduckgo.com/favicon.ico"
        )
    );
  }
}
